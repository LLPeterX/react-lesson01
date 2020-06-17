import React from 'react'


// HOC withLazyLoading: пока загружается основная компонента, отображаем fallback
// Вместо "Loading..." можно указать Preloader
export function withLazyLoading<WCP>(WrappedComponent:React.ComponentType<WCP>) {
  return (props:WCP) => {
    return (
      <React.Suspense fallback={<div>Загрузка...</div>}>
        <WrappedComponent {...props} />
      </React.Suspense >
    )
  }
}

