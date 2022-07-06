import classes from "./Layout.module.css";
import Headers from "../Header/Header";
import SideBar from "../SideBar/SideBar";
const Layout = (props) => {
  console.log("Layout rendering?");

  return (
    <>
      <Headers />
      <SideBar />

      <div className={classes.container}>
        <main className={classes["inner-container"]}>{props.children}</main>
      </div>
    </>
  );
};
export default Layout;
