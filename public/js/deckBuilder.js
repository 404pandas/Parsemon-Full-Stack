// Update a deck deck
$(document).ready(function () {
  $('#save-deck-btn').click(function () {
    const deckName = $('#deck-name-input').val() // Move this line here
    const deckId = $('#deck-carousel .carousel-item.active').data('deck-id')
    const cards = []

    // Object to store card names and their quantities
    const cardQuantities = {}

    // Loop through each card in the right column
    $('#right-column .pokemon-card').each(function () {
      const cardName = $(this).find('.card-title')[0].firstChild.textContent.trim()

      // Increment the quantity of the card name in the object
      if (cardQuantities.hasOwnProperty(cardName)) {
        cardQuantities[cardName]++
      } else {
        cardQuantities[cardName] = 1
      }
    })

    // Calculate total cards
    let totalCards = 0
    for (const cardName in cardQuantities) {
      if (cardQuantities.hasOwnProperty(cardName)) {
        totalCards += cardQuantities[cardName]
      }
    }

    // Convert cardQuantities object to an array of cards
    Object.entries(cardQuantities).forEach(([name, quantity]) => {
      cards.push({ name, quantity })
    })

    fetch(`/api/deckBuilder/${deckId}`, {
      method: 'PUT',
      body: JSON.stringify({
        name: deckName,
        cards: cards,
        totalCards: totalCards, // Add totalCards to the request body
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  })
})

// Create a new deck
$(document).ready(function () {
  $('#create-deck-btn').click(function () {
    const deckName = $('#deck-name-input').val() // Move this line here

    const cards = []

    // Object to store card names and their quantities
    const cardQuantities = {}

    // Loop through each card in the right column
    $('#right-column .pokemon-card').each(function () {
      const cardName = $(this).find('.card-title')[0].firstChild.textContent.trim()

      // Increment the quantity of the card name in the object
      if (cardQuantities.hasOwnProperty(cardName)) {
        cardQuantities[cardName]++
      } else {
        cardQuantities[cardName] = 1
      }
    })

    // Calculate total cards
    let totalCards = 0
    for (const cardName in cardQuantities) {
      if (cardQuantities.hasOwnProperty(cardName)) {
        totalCards += cardQuantities[cardName]
      }
    }
    // Convert cardQuantities object to an array of cards
    Object.entries(cardQuantities).forEach(([name, quantity]) => {
      cards.push({ name, quantity })
    })
    fetch(`/api/deckBuilder/`, {
      method: 'POST',
      body: JSON.stringify({
        name: deckName,
        cards: cards,
        totalCards: totalCards,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          console.error('Error:', error)
          // Display error button
          $('#error-button').show()
          // Attach click event to error button
          $('#error-button').click(() => {
            $('#error-details').text(error.message).toggle()
          })
        }
      })
      .then(() => {
        location.reload()
      })
  })
})

// Load deck
$(document).ready(function () {
  const leftColumn = $('#left-column')
  const rightColumn = $('#right-column')

  // Initialize Draggable for the left column
  leftColumn.find('.pokemon-card').draggable({
    revert: 'invalid',
    helper: 'clone',
    drag: function (event, ui) {
      const count = $('#right-column').find('.pokemon-card').length
      const span = $('#card-count')
      console.log(count)
      span.text(count)
      // Return the count
      return count
    },
  })

  // Initialize Droppable for the right column
  rightColumn.droppable({
    drop: function (event, ui) {
      const clonedCard = ui.draggable
        .clone()
        .addClass('col s5 pokemon-card card ui-draggable ui-draggable-handle')

      $(this).append(clonedCard)

      clonedCard.find('.toggle-btn').text('-').addClass('remove-card')
      // Update toggle buttons after dropping a card
      const count = $('#right-column').find('.pokemon-card').length
      const span = $('#card-count')
      console.log(count)
      span.text(count)
      // Return the count
      return count
    },
  })
  // Add listeners for drag events if needed
  leftColumn.on('dragstart', '.pokemon-card', () => {
    const draggedCard = $('.ui-draggable-dragging')

    const toggleBtn = draggedCard.find('.toggle-btn')
    toggleBtn.text('-')
    console.log('Drag started')
    const count = $('#right-column').find('.pokemon-card').length
    const span = $('#card-count')
    console.log(count)
    span.text(count)
    // Return the count
    return count
  })

  leftColumn.on('dragstop', '.pokemon-card', () => {
    console.log('Drag stopped')
  })
  rightColumn.on('drop', function (event, ui) {
    const count = $('#right-column').find('.pokemon-card').length
    const span = $('#card-count')
    console.log(count)
    span.text(count)
    // Return the count
    return count
  })

  function updateColumnStyles() {
    ;[leftColumn, rightColumn].forEach((column) => {
      if (column.children().length === 0) {
        column.addClass('empty-column')
      } else {
        column.removeClass('empty-column')
      }
    })
  }

  function countPokemonCards() {
    $('.toggle-btn').each(function () {
      const card = $(this).closest('.card')
      const isInRightColumn = card.parent().is(rightColumn)

      if (isInRightColumn) {
        $(this).text('-').addClass('remove-card')
      } else {
        $(this).text('+').removeClass('remove-card')
      }
    })
  }

  updateColumnStyles()
  countPokemonCards()

  // Toggle card content visibility on icon click
  $('.more-btn').click(function () {
    const cardContent = $(this).closest('.card').find('.card-content')
    cardContent.toggle()
  })

  // Toggle card content visibility when card content is clicked
  $('.card-content').click(function () {
    $(this).toggle()
  })

  // Toggle adding/removing from the right column
  $(document).on('click', '.toggle-btn', function () {
    const rightColumn = $('#right-column')
    const card = $(this).closest('.card')

    // Clone the card and add necessary classes
    const clonedCard = card
      .clone()
      .addClass('col s5 pokemon-card card ui-draggable ui-draggable-handle')

    // Update toggle button and append cloned card to the right column
    clonedCard.find('.toggle-btn').text('-').addClass('remove-card')
    rightColumn.append(clonedCard)

    // Update card count
    const count = rightColumn.find('.pokemon-card').length
    const span = $('#card-count')
    span.text(count)

    // Return the count (optional)
    return count
  })
})

$(document).on('click', '.toggle-btn.remove-card', function () {
  const selectedCard = $(this).parent('.pokemon-card')
  // Ensure selectedCard exists
  if (selectedCard.length > 0) {
    selectedCard.remove()
    const count = $('#right-column').find('.pokemon-card').length
    const span = $('#card-count')
    console.log('Card removed:', selectedCard)
    span.text(count)
  } else {
    console.log('Unable to find parent card element.')
  }
})
$(document).ready(function () {
  $('.carousel').carousel()
})
