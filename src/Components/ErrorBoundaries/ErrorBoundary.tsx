import { Grid, Typography } from "@material-ui/core";
import React, { Component, ErrorInfo, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) 
    {
      return (
        <Grid container justify="center" alignItems="baseline"
            className="contentDiv" xs={10} xl={9}>
            <Grid item container xs={10}>
                <Grid item container justify="center" xs={12}>
                    <Typography variant="h4">
                        Something went wrong
                    </Typography>
                </Grid>    
                <Grid item container justify="center" xs={12}>
                    <Typography variant="h6">
                        Try to refresh that page. If after refreshing you 
                        still see this message, then server may be down.
                    </Typography>
                </Grid>    
            </Grid>     
        </Grid>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;