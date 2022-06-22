import React from "react";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import Modal from "../UI/Modal/Modal";
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    console.log("error report", error);

    // 다음 렌더링에서 폴백 UI가 보이도록 상태를 업데이트 합니다.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log("error report", error);
    this.setState({ hasError: true });
    // 에러 리포팅 서비스에 에러를 기록할 수도 있습니다.
    // logErrorToMyService(error, errorInfo);
  }

  render() {
    console.log("render check", this.state.hasError);
    if (this.state.hasError) {
      return (
        <Modal
          type="ERROR"
          message="로그인이 필요한 기능입니다."
          onClose={() => {
            this.props.history.replace("/login");
            this.setState({ hasError: false });
          }}
        />
      );
    }

    return this.props.children;
  }
}

export default withRouter(ErrorBoundary);
