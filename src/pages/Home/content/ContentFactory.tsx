import { HomeType } from "../home.enum";

import Login from "./login";
import Register from "./register";

interface ContentFactoryProps {
    type: HomeType;
}

const ContentFactory = (contentFactoryProps: ContentFactoryProps) => {
    if (contentFactoryProps.type === HomeType.REGISTER)
        return <Register />
    else
        return <Login />
}

export default ContentFactory