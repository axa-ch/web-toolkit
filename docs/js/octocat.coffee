(($) ->

  octodex = [
    "https://octodex.github.com/images/jetpacktocat.png",
    "https://octodex.github.com/images/topguntocat.png",
    "https://octodex.github.com/images/femalecodertocat.png",
    "https://octodex.github.com/images/daftpunktocat-thomas.gif",
    "https://octodex.github.com/images/daftpunktocat-guy.gif",
    "https://octodex.github.com/images/foundingfather_v2.png",
    "https://octodex.github.com/images/poptocat_v2.png",
    "https://octodex.github.com/images/Professortocat_v2.png",
    "https://octodex.github.com/images/goretocat.png",
    "https://octodex.github.com/images/gangnamtocat.png",
    "https://octodex.github.com/images/spidertocat.png",
    "https://octodex.github.com/images/stormtroopocat.png",
    "https://octodex.github.com/images/pusheencat.png",
    "https://octodex.github.com/images/deckfailcat.png",
    "https://octodex.github.com/images/murakamicat.png",
    "https://octodex.github.com/images/homercat.png",
    "https://octodex.github.com/images/minion.png",
    "https://octodex.github.com/images/octofez.png",
    "https://octodex.github.com/images/heisencat.png",
    "https://octodex.github.com/images/red-polo.png",
    "https://octodex.github.com/images/twenty-percent-cooler-octocat.png",
    "https://octodex.github.com/images/momtocat.png",
    "https://octodex.github.com/images/front-end-conftocat.png",
    "https://octodex.github.com/images/snowoctocat.png",
    "https://octodex.github.com/images/adventure-cat.png",
    "https://octodex.github.com/images/herme-t-crabb.png",
    "https://octodex.github.com/images/orderedlistocat.png",
    "https://octodex.github.com/images/thanktocat.png",
    "https://octodex.github.com/images/baracktocat.jpg",
    "https://octodex.github.com/images/waldocat.png",
    "https://octodex.github.com/images/riddlocat.png",
    "https://octodex.github.com/images/oktobercat.png",
    "https://octodex.github.com/images/shoptocat.png",
    "https://octodex.github.com/images/bear-cavalry.png",
    "https://octodex.github.com/images/poptocat.png",
    "https://octodex.github.com/images/cherryontop-o-cat.png",
    "https://octodex.github.com/images/supportcat.png",
    "https://octodex.github.com/images/agendacat.png",
    "https://octodex.github.com/images/spocktocat.png",
    "https://octodex.github.com/images/swagtocat.png",
    "https://octodex.github.com/images/trekkie.png",
    "https://octodex.github.com/images/bouncercat.png",
    "https://octodex.github.com/images/pythocat.png",
    "https://octodex.github.com/images/repo.png",
    "https://octodex.github.com/images/benevocats.png",
    "https://octodex.github.com/images/puppeteer.png",
    "https://octodex.github.com/images/class-act.png",
    "https://octodex.github.com/images/original.png"
  ]

  getRandomOctocat = () ->
    octodex[Math.floor(Math.random() * (octodex.length-1))]

  $(document).ready () ->
    $('[data-octocat]').each (index, element) ->
      element.src = getRandomOctocat()

)(jQuery)

#! Copyright AXA Versicherungen AG 2015
