import './_errorPage.scss';

export const ErrorPage = () => {
  return (
    <div className="error-page-container">
      <img className="error-page-picture" src="/pictures/404.png" alt="404"/>
      <p className="error-page-notification">URL was not found...</p>
    </div>
  );
};
