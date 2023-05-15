export const getStudyDeck = async (deckName: string | undefined) => {
  const response = await fetch(`http://localhost:3000/study-deck/${deckName}`);
  const data = await response.json();
  return data;
};
