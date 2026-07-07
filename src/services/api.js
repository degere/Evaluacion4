
export const fetchPlatosChilenos = async () => {
  try {
    const response = await fetch(
      'https://www.themealdb.com/api/json/v1/1/filter.php?a=Chile'
    );
    if (!response.ok) throw new Error('Error al obtener los datos');
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error(error);
    return [];
  }}