import React from "react";


class ErrorBoundary extends React.Component {
    
    constructor(props) {
        super(props);

        
    this.state = { 
        hasError:false
     }

    }

    // static getDerivedStateFromError(error) {
    //     return {hasError:true};
    // }

    componentDidCatch(error){
        this.setState({hasError:true});
        console.log(error);
    }


    handleRefresh = () => {
        window.location.reload();
    }


    render() { 
        const {hasError} = this.state;
        if(hasError){
            return (<div className="min-h-screen flex items-center justify-center">
                <div className="flex flex-col justify-center bg-red-200 text-sm font-semibold p-4 rounded">
                    <p>Something is wrong!</p>
                    <button className="bg-red-300 px-3 py-1 rounded-full" onClick={this.handleRefresh}>Refresh</button>
                </div>
            </div>)
        }
        return this.props.children;
    }
}
 
export default ErrorBoundary;