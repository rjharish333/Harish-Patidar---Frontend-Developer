import React from 'react'

// Common component to display loader
function Loader() {
  return (
    <div class="flex justify-center items-center">
        <div class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
            {/* <span class="">Loading...</span> */}
        </div>
    </div>
  )
}

export default Loader