/**
 * Safely pull a page of results out of a backend ApiResponse<Page<T>>.
 * Handles every shape the backend can send:
 *   - null body
 *   - { success, data: null }
 *   - { success, data: { content: null } }
 *   - { success, data: { content: [...] } }
 */
export function getPage(response) {
  const page = response?.data?.data;
  if (!page) {
    return { content: [], totalPages: 0, totalElements: 0, number: 0, size: 0, first: true, last: true };
  }
  return {
    content: Array.isArray(page.content) ? page.content : [],
    totalPages: page.totalPages ?? 0,
    totalElements: page.totalElements ?? 0,
    number: page.number ?? 0,
    size: page.size ?? 0,
    first: page.first ?? true,
    last: page.last ?? true,
  };
}

/**
 * Safely pull a single object out of a backend ApiResponse<T>.
 */
export function getData(response, fallback = null) {
  return response?.data?.data ?? fallback;
}

/**
 * Safely pull an array out of a backend ApiResponse<List<T>>.
 */
export function getList(response) {
  const data = response?.data?.data;
  return Array.isArray(data) ? data : [];
}