import React from 'react'

// Common component to display error message
function ErrorMessage({message}) {
  return (
    <div class="p-4 mb-4 mt-2 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
        {message}
    </div>
  )
}

export default ErrorMessage