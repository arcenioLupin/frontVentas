export default function(start, end) {
  return [...Array(1 + end - start).keys()].map(v => start + v);
}
