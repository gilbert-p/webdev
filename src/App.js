import logo from './logo.svg';
import './App.css';
import mainStyles from './styles/main.module.css';

function App() {
  return (
    <div className={mainStyles.appContainer}>
      <header className={mainStyles.headerContainer}>
        <div className={mainStyles.glassOverlay}></div>
        <div className={mainStyles.imageScroll}></div>
        <div className={mainStyles.devTitle}>
          <h2>Web Developer</h2>
          <h2>Gilberto Placidon</h2>
        </div>
      </header>
    </div>
  );
}

export default App;
