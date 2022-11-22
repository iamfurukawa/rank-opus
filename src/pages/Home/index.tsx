import { HomeType } from './home.enum';

import ContentFactory from './content/ContentFactory';

import styles from './home.module.scss';

interface HomeProps {
    type: HomeType;
}

const Home = (homeProps: HomeProps) => {
    return (
        <div className={styles.content}>
            <ContentFactory type={homeProps.type} />
        </div>
    )
}

export default Home