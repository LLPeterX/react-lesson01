import React from 'react'

// HOC withLazyLoading: пока загружается основная компонента, отображаем fallback
// Вместо "Loading..." можно указать Preloader
const withLazyLoading = (Component) => {
  return (props) => {
    return (
      <React.Suspense fallback={<div>Загрузка...</div>}>
        <Component {...props} />
      </React.Suspense >
    )
  }
}

export default withLazyLoading;