$(document).ready(
  function() {
    moment.locale('it');
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
  //scorro le mensilità, generandole
  for (var i = 0; i < 12; i++){
    var meseAttuale = moment("2018").add(i, "M").format("MMMM");
    $("#template .month h4").text(meseAttuale + " 2018");
    var giorniMese = moment("2018").add(i, "M").daysInMonth();

    //scorro giorni mensilità, generandoli
    $("#template .month .days ul").text("");
    for (var j = 0; j < giorniMese; j++){
      $("#template .month .days ul").append("<li>" + (j + 1) + " " + meseAttuale);
    }

    //clono il template, rimuovo la classe hidden e lo appendo nel container
    var template = $("#template .month").clone();
    template.removeClass("hidden");
    $(".container").append(template);

    //chiamata ajax per le festività e le aggiungo ai giorni correlati, evidenziandoli
    $.ajax(
      {
        url: "https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=" + i + "",
        method: "GET",
        success: function (data) {
          for (var y = 0; y <data.response.length; y++){
            var nomeFesta = data.response[y].name;
            var giornoFesta = data.response[y].date;
            var dataFesta = moment(giornoFesta).format("D MMMM");

            $(".container li").each(function(){
              if ($(this).text() == dataFesta) {
                $(this).addClass("rosso");
                $(this).append(" " + nomeFesta);
              }
            });
          }
        },

        error: function () {
          alert("E' avvenuto un errore. ");
        }
      }
    );
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
