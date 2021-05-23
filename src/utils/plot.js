const generatePlot = (names, comparisions) => {
  const max_val = Math.max(...comparisions);
  const divide =
    max_val > 10000 ? 1000 : max_val > 1000 ? 100 : max_val > 100 ? 10 : 1;
  const max_lines = Math.round(max_val / divide);
  const max_names_len = Math.max(...names.map((name) => name.length)) + 1;
  const max_x_width = max_lines + max_names_len + 2;

  const blocks = ['┌', ...new Array(max_x_width + 2).fill('─'), '┐ ', max_val];

  for (let i = 0, len = names.length; i < len; i++) {
    const name = names[i];
    const value = Math.round(comparisions[i] / divide);

    blocks.push('\n');
    blocks.push('├─ ');

    blocks.push(name);
    blocks.push(...new Array(max_names_len - name.length).fill(' '));
    blocks.push(' ');

    blocks.push(...new Array(value).fill('─'));
    blocks.push(...new Array(max_lines - value + 1).fill(' '));

    blocks.push('│');
  }

  blocks.push('\n');
  blocks.push(...['└', ...new Array(max_x_width + 2).fill('─'), '┘']);

  return blocks.join('');
};

export default generatePlot;
