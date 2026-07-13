export function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

export function getPageItems(items, page, pageSize) {
  const start = (page - 1) * pageSize;
  return items.slice(start, start + pageSize);
}

export function getTotalPages(items, pageSize) {
  const count = typeof items === 'number' ? items : (items?.length ?? 0);
  if (!count || !pageSize) return 0;
  return Math.ceil(count / pageSize);
}