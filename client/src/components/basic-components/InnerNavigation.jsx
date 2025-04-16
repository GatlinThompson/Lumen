import "../../styles/inner-navigation.scss";
export default function InnerNavigation({ children, extraClasses }) {
  //check if children are multlpe or single
  const childrenArray = Array.isArray(children) ? children : [children];
  return (
    <ul className={`inner_nav ${extraClasses}`}>
      {childrenArray &&
        childrenArray.map((child, index) => {
          return (
            <li key={index} className={"list_item"}>
              {child}
            </li>
          );
        })}
    </ul>
  );
}
