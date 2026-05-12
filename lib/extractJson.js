export function extractJson(text) {
  if (!text) throw new Error('Empty response from Dampi.');
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');

  if (start === -1 || end === -1) {
    console.error('AI did not return valid JSON:', text);
    throw new Error('Dampi did not return a JSON object.');
  }

  return JSON.parse(text.slice(start, end + 1));
}
