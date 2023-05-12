export interface CardForm {
  deckId: string;
  front: string;
  back: string;
}

export const createCard = async (newCard: CardForm) => {
  const response = await fetch(`http://localhost:3000/create-card`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(newCard),
    credentials: "include",
  });

  const data = await response.json();
  console.log(data);
  return data;
};
