const res = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
const data = await res.json();
const deck_id = data.deck_id;
console.log(deck_id);

const draw_card = async (deck_id) => {
    const draw_res = await fetch(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`);
    const draw_data = await draw_res.json();
    return draw_data.cards;
}

const card = await draw_card(deck_id);
console.log(card);
const card2 = await draw_card(deck_id);
console.log(card2);

// challenge: keep drawing cards until you have drawn 10 red cards
// and print (console.log()) all the red cards you've drawn out

// challenge 2: keep drawing cards until the value of all cards is at least 30
// for this, treat all face cards (jack, queen, king) as 10 and ace as 1