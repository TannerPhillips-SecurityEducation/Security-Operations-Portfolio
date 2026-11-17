// Build-time-only formatter. All source text is escaped before markup is emitted.
// It colors an existing valid YAML string without changing the underlying document.
const escapeHtml = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;')
  .replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

export function highlightYaml(source: string): string {
  return source.split('\n').map(line => {
    if (/^\s*#/.test(line)) return '<span class="yaml-comment">'+escapeHtml(line)+'</span>';
    const match = line.match(/^(\s*)(-\s+)?([a-z][a-z0-9_-]*)(:)(.*)$/i);
    if(match) {
      const [,indent,marker,key,colon,rest] = match;
      const value = rest.trimStart();
      const space = rest.slice(0,rest.length-value.length);
      const styledValue = value ? '<span class="yaml-value">'+escapeHtml(value)+'</span>' : '';
      return escapeHtml(indent+ (marker || '')) + '<span class="yaml-key">' + escapeHtml(key) + '</span><span class="yaml-punctuation">' + colon + '</span>' + escapeHtml(space) + styledValue;
    }
    if(/^\s*-\s+/.test(line)) {
      const matchItem=line.match(/^(\s*)(-\s+)(.*)$/);
      if(matchItem) return escapeHtml(matchItem[1])+'<span class="yaml-punctuation">- </span><span class="yaml-value">'+escapeHtml(matchItem[3])+'</span>';
    }
    return '<span class="yaml-value">'+escapeHtml(line)+'</span>';
  }).join('\n');
}
