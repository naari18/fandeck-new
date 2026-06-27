export function downloadShareCard(shade) {
  const S = 1080;
  const canvas = document.createElement('canvas');
  canvas.width = S;
  canvas.height = S;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = shade.shadeHexCode;
  ctx.fillRect(0, 0, S, S);

  ctx.fillStyle = 'rgba(255,255,255,0.93)';
  ctx.fillRect(0, S * 0.64, S, S * 0.36);

  ctx.textBaseline = 'top';
  const name = (shade.entityName || '').replace(/\b\w/g, (c) => c.toUpperCase());

  ctx.fillStyle = '#1a1a1a';
  ctx.font = 'bold 66px sans-serif';
  ctx.fillText(name, 72, S * 0.66);

  ctx.fillStyle = '#6b6b6b';
  ctx.font = '38px sans-serif';
  ctx.fillText(shade.entityCode, 72, S * 0.66 + 88);

  ctx.fillStyle = '#aaa';
  ctx.font = '30px sans-serif';
  ctx.fillText((shade.shadeFamily || '').replace(/\b\w/g, (c) => c.toUpperCase()), 72, S * 0.66 + 144);

  const lx = 72, ly = S - 106;
  ctx.fillStyle = '#c41230';
  ctx.fillRect(lx, ly, 80, 44);
  ctx.fillStyle = '#fff';
  ctx.font = 'bold italic 28px sans-serif';
  ctx.textBaseline = 'middle';
  ctx.fillText('ap', lx + 17, ly + 22);

  ctx.fillStyle = '#1a1a1a';
  ctx.font = 'bold 28px sans-serif';
  ctx.fillText('Asian Paints', lx + 94, ly + 22);

  ctx.fillStyle = '#aaa';
  ctx.font = '26px sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText("Family's Choice ♡", S - 72, ly + 22);

  const a = document.createElement('a');
  a.download = `${shade.entityName.replace(/\s+/g, '-')}-${shade.entityCode}.png`;
  a.href = canvas.toDataURL('image/png');
  a.click();
}
