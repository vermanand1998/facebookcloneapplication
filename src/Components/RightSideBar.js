import "../Styles/RightSideBar.css";
function RightSideBar() {
  return (
    <div className="right-sidebar">
      <div className="widgets">
        <iframe
          title="Pages"
          src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FMicrosoft&tabs=timeline&width=340&height=1500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&1:118964172556:web:55ce63a3ff2a4fec6cfb29"
          width="380"
          height="100%"
          style={{ border: "none"}}
          scrolling="no"
          frameborder="0"
          allowTransparency="true"
          allow="encrypted-media"
        ></iframe>
      </div>
    </div>
  );
}

export default RightSideBar;
