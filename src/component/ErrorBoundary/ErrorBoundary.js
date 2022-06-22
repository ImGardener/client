import React from "react";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import Modal from "../UI/Modal/Modal";
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // 다음 렌더링에서 폴백 UI가 보이도록 상태를 업데이트
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ hasError: true });
  }

  render() {
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
