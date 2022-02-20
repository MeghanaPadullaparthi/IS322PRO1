const cards = [
    {title: "Catan", image: "images/catan.jpeg", price: 11.50},

    {title: "Checkers", image: "images/checkers.jpg", price: 9.00 },

    {title: "Chess", image: "images/chess.jpeg", price: 21.00},

    {title: "Connect Four",image: "images/connectfour.jpeg",price:25.00},

    {title: "Guess Who", image: "images/guesswho.jpeg", price: 35.00},

    {title: "Life", image: "images/lifegame.jpeg", price: 45.00},

    {title: "Mancala", image: "images/mancala.jpeg", price: 60.00},

    {title: "Monopoly Game", image: "images/MonopolyGame.jpeg", price: 75.00}
];

function renderList (results) {
    var tableBody = document.querySelector('#cards');

    // clear out inner HTML to get rid of any older results
    tableBody.innerHTML = '';
    // Map each database record to a string containing the HTML for it's row
    var tableRows = results.map((result)  =>
        `<div class="card" style="width: 260px ">
        <img src=${result.image} style=" height: 200px; width: 260px;">
        <h1>${result.title}</h1> 
        <p class ="price">  $${result.price} </p>
        <p><button>Add to Cart</button></p>
        </div> `)


    // Set the contents of the table body to the new set of rendered HTML rows
    tableRows.forEach((k) => {
        tableBody.innerHTML += k;
    });


}

renderList(cards);







function orderBy(sortValue) {
    var sortedResults;
    if (sortValue === 'asc-name') {
        sortedResults = cards.sort(function (a, b) {
            var nameA = a.title.toUpperCase();
            var nameB = b.title.toUpperCase();
            var quest = nameA<nameB;
            if (quest) {
                return -1;
            }
            else {
                return 1;
            }
        });
    } else {
        sortedResults = cards.sort(function (a, b) {
            return a[sortValue] - b[sortValue];
        });
    }
    renderList(sortedResults);
}
document.querySelector('#orderBy').addEventListener('change', function(event){
    orderBy(event.target.value);
});






function orderdec(sortValue) {
    var sortedResults;
    if (sortValue === 'dsc-name') {
        sortedResults = cards.sort(function (a, b) {
            var nameA = a.title.toUpperCase();
            var nameB = b.title.toUpperCase();
            var question = nameA>nameB;
            if (question) {
                return -1;
            }
            else{
                return 1;
            }
        });
    } else {
        sortedResults = cards.sort(function (a, b) {
            return a[sortValue] - b[sortValue];
        });
    }
    renderList(sortedResults);
}
document.querySelector('#orderBy').addEventListener('change', function(event){
    orderdec(event.target.value);
});



function PriceRange (price) {
    var priceRanges = {cheap: [1, 10], medium:[11, 20], expensive:[21, 30], mostexpensive: [31, 200]};
    var range = priceRanges[price];
    var Results = cards.filter(function (row) {
        var k = row.price > range[0];
        var j = row.price< range[1];
        return k && j;
    });
    if(!priceRanges){
        return renderList(cards);
    }

    renderList(Results);
}
document.querySelector('#priceRange').addEventListener('change', function (event) {
    PriceRange(event.target.value);
});

