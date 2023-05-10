export interface DeckForm {
  deckName: string;
}

export const postDeck = async (newDeck: DeckForm) => {
  const response = await fetch(`http://localhost:3000/create-deck`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(newDeck),
    credentials: "include",
  });

  const data = await response.json();
  return data;
};
