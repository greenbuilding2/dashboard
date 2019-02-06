export function mapStatusToColor(status) {
  switch(status) {
    case 'active':
      return 'blue';
    case 'maintenance':
      return 'grey';
    case 'inactive':
      return 'red';
    case 'turn-on':
      return 'green';
    case 'turn-off':
      return 'yellow';
    default:
      return 'white';
  }
}

export function getRandomStrokeStyle() {
  const first = Math.round(Math.random() *10 + 1);
  const second = Math.round(Math.random() * 5 +1);
  return `${first}, ${second}`;
}

export function getRandomColor() {
  const rand = Math.round(Math.random() * 3);

  const colors = ['#8884d8', '#82ca9d', '#ffc658',  '#ADDDE1'];
  return colors[rand];
}

export function getRandomShape() {
  const rand = Math.round(Math.random() *6);
  const shapes = ['circle', 'cross' ,'diamond' , 'square' , 'star' , 'triangle' , 'wye' ];
  return shapes[rand];
}