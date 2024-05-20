function updateToggleButtons() {
  console.log('OIKJKFJLAEJAIFWJI')
  leftColumn.find('.card').each(function () {
    const toggleBtn = $(this).find('.toggle-btn')
    toggleBtn.text('+')
  })

  rightColumn.find('.card').each(function () {
    const toggleBtn = $(this).find('.toggle-btn')
    toggleBtn.text('-')
  })
}

$(document).ready(function () {
  const leftColumn = $('#left-column')
  const rightColumn = $('#right-column')

  // Initialize Draggable for the left column
  leftColumn.find('.pokemon-card').draggable({
    revert: 'invalid',
    helper: 'clone',
  })

  // Initialize Droppable for the right column
  rightColumn.droppable({
    drop: function (event, ui) {
      const clonedCard = ui.draggable
        .clone()
        .addClass('col s5 pokemon-card card ui-draggable ui-draggable-handle')

      $(this).append(clonedCard)

      // Update toggle buttons after dropping a card
      updateToggleButtons()
    },
  })
  // Add listeners for drag events if needed
  leftColumn.on('dragstart', '.pokemon-card', () => {
    const draggedCard = $('.ui-draggable-dragging')

    const toggleBtn = draggedCard.find('.toggle-btn')
    toggleBtn.text('-')
    console.log('Drag started')
  })

  leftColumn.on('dragstop', '.pokemon-card', () => {
    console.log('Drag stopped')
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

  function updateToggleButtons() {
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
  updateToggleButtons()

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
    const card = $(this).closest('.card')
    const isInRightColumn = card.parent().is(rightColumn)

    if (isInRightColumn) {
      // Remove card from the right column
      card.remove()
    } else {
      // Add card to the right column
      rightColumn.append(
        card.clone().addClass('col s5 pokemon-card card ui-draggable ui-draggable-handle'),
      )
      updateToggleButtons()
    }

    updateColumnStyles()
  })
})
