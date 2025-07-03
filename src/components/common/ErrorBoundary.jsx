import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-100">
                    <div className="text-center p-8 bg-white rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold text-red-600 mb-4">Đã xảy ra lỗi!</h2>
                        <p className="text-gray-600 mb-4">Vui lòng refresh trang hoặc liên hệ admin.</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Refresh Trang
                        </button>
                        <details className="mt-4 text-left">
                            <summary className="cursor-pointer text-sm text-gray-500">Chi tiết lỗi</summary>
                            <pre className="mt-2 text-xs text-red-500 overflow-auto">
                                {this.state.error?.toString()}
                            </pre>
                        </details>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
