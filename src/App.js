import { Provider } from "react-redux";
import store from "./store";
import ErrorBoundary from "./ErrorBoundary";
import UserProfile from "./UserProfile";
import LoginForm from "./LoginForm";
import { Tabs } from "./Tabs";
import Modal from "./Modal";
import { useState } from "react";

/**
 * Main App component demonstrating all components
 */
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = (data) => {
    console.log("Login successful:", data);
    setIsLoggedIn(true);
  };

  return (
    <Provider store={store}>
      <ErrorBoundary>
        <div className="app">
          <header>
            <h1>React Lab 5 - Advanced Components</h1>
          </header>

          <main>
            {/* Tabs Component Demo */}
            <section>
              <h2>Tabs Component</h2>
              <Tabs defaultIndex={0}>
                <Tabs.List ariaLabel="Demo tabs">
                  <Tabs.Tab index={0}>Profile</Tabs.Tab>
                  <Tabs.Tab index={1}>Login</Tabs.Tab>
                  <Tabs.Tab index={2}>Settings</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel index={0}>
                  <UserProfile userId={1} />
                </Tabs.Panel>

                <Tabs.Panel index={1}>
                  {!isLoggedIn ? (
                    <LoginForm onSuccess={handleLoginSuccess} />
                  ) : (
                    <p>You are already logged in!</p>
                  )}
                </Tabs.Panel>

                <Tabs.Panel index={2}>
                  <div>
                    <h3>Settings</h3>
                    <p>Settings content goes here...</p>
                  </div>
                </Tabs.Panel>
              </Tabs>
            </section>

            {/* Modal Component Demo */}
            <section>
              <h2>Modal Component</h2>
              <button onClick={() => setIsModalOpen(true)}>
                Open Modal
              </button>

              <Modal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)}
              >
                <div id="modal-title">
                  <h2>Welcome to the Modal</h2>
                </div>
                <p>This is a modal with accessibility features!</p>
                <button onClick={() => setIsModalOpen(false)}>
                  Close Modal
                </button>
              </Modal>
            </section>
          </main>
        </div>
      </ErrorBoundary>
    </Provider>
  );
}

export default App;
