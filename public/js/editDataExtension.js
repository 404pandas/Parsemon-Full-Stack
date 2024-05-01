const dataExtensionId = document.querySelector('input[name="dataExtension-id"]').value

const editFormHandler = async function (event) {
  event.preventDefault()

  const body = document.querySelector('textarea[name="dataExtension-body"]').value

  await fetch(`/api/dataExtension/${dataExtensionId}`, {
    method: 'PUT',
    body: JSON.stringify({
      body,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  document.location.replace('/dashboard')
}

const deleteClickHandler = async function () {
  await fetch(`/api/dataExtension/${dataExtensionId}`, {
    method: 'DELETE',
  })

  document.location.replace('/dashboard')
}

document.querySelector('#edit-dataExtension-form').addEventListener('submit', editFormHandler)
document.querySelector('#delete-btn').addEventListener('click', deleteClickHandler)
