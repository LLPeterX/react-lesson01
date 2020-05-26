import React from 'react'

// Вместо "Loading..." можно указать Preloader
const withLazyLoading = (Component) => {
  return (props) => {
    return (
      <React.Suspense fallback={<div>Loading...</div>}>
        <Component {...props} />
      </React.Suspense >
    )
  }
}

export default withLazyLoading;