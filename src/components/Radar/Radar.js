// src/components/Radar/Radar.js
import React, { useContext } from "react";
import PropTypes from "prop-types";
import { RadarContents } from "./Radar.style";

import Quadrant from "../Quadrant/Quadrant";
import { getColorScale, ThemeContext } from "../theme-context";

const MAX_COLLISION_RETRY_COUNT = 350;
const TOLERANCE_CONSTANT = 6;
const DEFAULT_WIDTH = 700;
const RADIUS_DIMINISH_CONSTANT = 1.5;
const RIGHT_EXTENSION = 1.1;

function Radar(props) {
  const width = props.width || DEFAULT_WIDTH;
  const rings = props.rings || [""];
  const radiusDiminishConstant = props.radiusDiminish || RADIUS_DIMINISH_CONSTANT;
  const data = Array.isArray(props.data) ? props.data : [];

  const { fontSize, fontFamily, colorScale } = useContext(ThemeContext);
  const margin = props.margin || 5;
  const angleDeg = 360 / props.quadrants.length;
  const toleranceX = (width / Math.max(rings.length, 1) / 100) * TOLERANCE_CONSTANT * 4;
  const toleranceY = props.fontSize || fontSize;

  // Convert entries into blips with coordinates
  const processRadarData = (quadrants, rings, entries) => {
    const normalized = entries
      .map((e, idx) => ({
        ...e,
        _ringIndex: rings.indexOf(e.ring),
        _quadrantIndex: quadrants.indexOf(e.quadrant),
        _idx: idx,
      }))
      .filter((e) => e._ringIndex >= 0 && e._quadrantIndex >= 0);

    normalized.sort((a, b) => a._ringIndex - b._ringIndex);

    let collisionCount = 0;
    const results = [];

    for (let i = 0; i < normalized.length; i++) {
      const entry = normalized[i];
      const anglePerQuadrant = (2 * Math.PI) / quadrants.length;
      const quadrantDelta = anglePerQuadrant * entry._quadrantIndex;

      const coordinates = getRandomCoordinates(
        rings,
        entry,
        anglePerQuadrant,
        quadrantDelta,
        results,
        collisionCount
      );
      if (collisionCount < MAX_COLLISION_RETRY_COUNT) {
        collisionCount = coordinates.collisionCount;
      }

      results.push({
        id: entry._idx,
        name: entry.name,
        ring: entry.ring,
        quadrant: entry.quadrant,
        description: entry.description,
        isNew: entry.isNew,
        x: coordinates.x,
        y: coordinates.y,
      });
    }

    return results;
  };

  // Generate random coordinates for blips
  const getRandomCoordinates = (
    rings,
    entry,
    anglePerQuadrant,
    quadrantDelta,
    results,
    collisionCount = 0
  ) => {
    const polarToCartesian = (r, t) => ({
      x: r * Math.cos(t),
      y: r * Math.sin(t),
    });

    const calculateRadiusDiminish = (nrOfRings) => {
      let max = 1;
      let arr = [1];
      for (let i = 1; i < nrOfRings; i++) {
        max = max * radiusDiminishConstant;
        arr.push(max);
      }
      const sum = arr.reduce((a, b) => a + b);
      arr = arr.map((a) => a / sum);
      arr.reverse();
      for (let i = 1; i < nrOfRings; i++) {
        arr[i] = arr[i - 1] + arr[i];
      }
      arr.push(0);
      arr.sort();
      return arr;
    };

    const radiusArray = calculateRadiusDiminish(rings.length);

    const getPositionByQuadrant = (radiusArray) => {
      const ringCount = Math.max(rings.length, 1);
      const margin = 0.2;
      const ringIndex = entry._ringIndex;
      const start = radiusArray[ringIndex] + (1 / ringCount) * margin;
      const span =
        Math.random() *
        (radiusArray[ringIndex + 1] -
          radiusArray[ringIndex] -
          2 * ((1 / ringCount) * margin));
      return start + span;
    };

    const hasCollision = (results, coordinates) => {
      if (collisionCount >= MAX_COLLISION_RETRY_COUNT) return false;
      for (const result of results) {
        if (
          Math.abs(result.x - coordinates.x) <= toleranceX &&
          Math.abs(result.y - coordinates.y) <= toleranceY
        ) {
          if (++collisionCount >= MAX_COLLISION_RETRY_COUNT) {
            console.log("max collision retry limit reached:", collisionCount);
          }
          return true;
        }
      }
      return false;
    };

    const randomPosition = getPositionByQuadrant(radiusArray);
    const positionAngle = Math.random();
    const ringWidth = width / 2;

    const theta = positionAngle * anglePerQuadrant + quadrantDelta;
    const r = randomPosition * ringWidth;
    const coord = polarToCartesian(r, theta);

    const collision = hasCollision(results, coord);
    if (collision) {
      return getRandomCoordinates(
        rings,
        entry,
        anglePerQuadrant,
        quadrantDelta,
        results,
        collisionCount
      );
    }

    coord.collisionCount = collisionCount;
    return coord;
  };

  const points = processRadarData(props.quadrants, rings, data);
  console.log("Radar points:", points);

  return (
    <ThemeContext.Provider
      value={{
        fontSize: props.fontSize || fontSize,
        itemFontSize: props.itemFontSize || props.fontSize || fontSize,
        fontFamily: props.fontFamily || fontFamily,
        colorScale: props.colorScaleIndex
          ? getColorScale(props.colorScaleIndex)
          : colorScale,
        quadrantsConfig: props.quadrantsConfig || {},
      }}
    >
      <RadarContents
        width={width * RIGHT_EXTENSION}
        height={width}
        style={{ margin }}
      >
        <g transform={`translate(${width / 2},${width / 2})`}>
          {props.quadrants.map((quadrantName, index) => {
            const filteredPoints = points.filter(
              (p) => p.quadrant === quadrantName
            );
            return (
              <g key={quadrantName}>
                <Quadrant
                  transform={`rotate(${angleDeg * index}) translate(${margin},${margin})`}
                  rotateDegrees={angleDeg * index}
                  width={width - 2 * margin}
                  index={index}
                  rings={rings}
                  points={filteredPoints}
                  angle={angleDeg}
                  name={quadrantName}
                  radiusDiminish={radiusDiminishConstant}
                />
              </g>
            );
          })}
        </g>
      </RadarContents>
    </ThemeContext.Provider>
  );
}

Radar.propTypes = {
  quadrants: PropTypes.array.isRequired,
  rings: PropTypes.array,
  data: PropTypes.array,
  width: PropTypes.number,
  fontSize: PropTypes.number,
  itemFontSize: PropTypes.number,
  colorScaleIndex: PropTypes.number,
  radiusDiminish: PropTypes.number,
  margin: PropTypes.number,
  quadrantsConfig: PropTypes.object,
};

export default Radar;
