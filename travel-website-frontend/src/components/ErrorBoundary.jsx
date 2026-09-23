import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="container-page py-16 text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-2">Something went wrong</h1>
          <pre className="text-xs text-gray-600 bg-gray-100 p-4 rounded mt-4 overflow-auto text-left max-w-2xl mx-auto">
            {this.state.error.message}
          </pre>
          <button
            onClick={() => window.location.reload()}
            className="btn-primary mt-6"
          >
            Reload page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}