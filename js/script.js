$(document).ready(
  function() {
    //avvio funzione generazione mensilità
    generazioneMesi();

    //funzione al click del tasto "precedente"
    $(document).on("click", ".prev", function(){
      calendarioIndietro();
    });

    //funzione al click del tasto "successivo"
    $(document).on("click", ".next", function(){
      calendarioAvanti();
    });
  }
);

//FUNZIONE generazione mesi
function generazioneMesi() {
  //clono template Handlebars
  var source = $("#entry-template").html();
  var template = Handlebars.compile(source);

  //scorro le mensilità
  for (var i = 0; i < 12; i++){
    var meseAttuale = moment("2018").add(i, "M").format("MMMM");
    var giorniMese = moment("2018").add(i, "M").daysInMonth();
    var arraygiorniMese = [];

    //scorro giorni mensilità
    for (var j = 0; j < giorniMese; j++){
      arraygiorniMese.push((j + 1) + " " + meseAttuale)
    }

    //inserisco giorni e mese attuale nell'oggetto Handlebars
    var context = {
      mese: meseAttuale,
      giorni: arraygiorniMese
    };

    //appendo il template Handlebars
    var html = template(context);
    $(".container").append(html)
  }

  //inizializzo classi mensilità e bottoni
  $(".month:first-child").addClass('first active');
  $(".month:first-child .prev").remove();
  $(".month:last-child").addClass('last');
  $(".month:last-child .next").remove();
}

//FUNZIONE calendario indietro
function calendarioIndietro() {
  var meseCorrente = $(".month.active");
  meseCorrente.removeClass("active");
  meseCorrente.prev().addClass("active");
};

//FUNZIONE calendario avanti
function calendarioAvanti() {
  var meseCorrente = $(".month.active");
  meseCorrente.removeClass("active");
  meseCorrente.next().addClass("active");
};

//chiamata ajax festività
for (var z = 0; z < 12; z++) {
  $.ajax(
    {
      url: "https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=" + z + "",
      method: "GET",
      success: function (data) {
        feste = data.response
        console.log(feste)
      },

      error: function () {
        alert("E' avvenuto un errore. ");
      }
    }
  );
}
