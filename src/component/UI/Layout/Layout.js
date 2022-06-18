import classes from "./Layout.module.css";
import Headers from "../Header/Header";
import SideBar from "../SideBar/SideBar";
const Layout = (props) => {
  return (
    <>
      <Headers />
      <SideBar />
      <main className={classes.container}>{props.children}</main>
    </>
  );
};
export default Layout;
