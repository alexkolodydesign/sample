// import React from 'react';
// import {
//   ResponsiveContainer,
//   AreaChart,
//   Area,
//   YAxis,
//   CartesianGrid,
//   Tooltip
// } from 'recharts';

// class Chart extends React.Component {
//   shouldComponentUpdate = nextProps => {
//     if (
//       nextProps.width !== this.props.width ||
//       nextProps.metricType !== this.props.metricType ||
//       // If data changes, update elevation chart
//       this.props.data[0] !== nextProps.data[0] ||
//       this.props.data.length !== nextProps.data.length
//     ) {
//       return true;
//     }
//     return false;
//   };

//   render() {
//     const {
//       data,
//       onMouseMove,
//       metricType,
//       maxElevation,
//       minElevation,
//       renderTooltip,
//       areaStrokeColor
//     } = this.props;
//     return (
//       <ResponsiveContainer width="100%" height={250}>
//         <AreaChart
//           data={data}
//           onMouseMove={onMouseMove}
//           margin={{ top: 10, right: 20, left: 10, bottom: 20 }}
//         >
//           <CartesianGrid strokeDasharray="3 3" />
//           <YAxis
//             allowDecimals={false}
//             unit={metricType === 'imperial' ? ' ft' : ' m'}
//             interval="preserveEnd"
//             type="number"
//             domain={[maxElevation, minElevation]}
//           />
//           <Tooltip content={renderTooltip} />
//           <Area
//             type="monotone"
//             dataKey={metricType === 'imperial' ? 'elevation' : 'elevationMetric'}
//             stroke={areaStrokeColor}
//             strokeWidth={2}
//             fill="rgba(197,196,188,0.8)"
//           />
//         </AreaChart>
//       </ResponsiveContainer>
//     );
//   }
// }

// export default Chart;
