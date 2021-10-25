import {
  useQuery,
  gql
} from "@apollo/client";

function GetFiveLaunches() {

    const FIVE_LAUNCHES = gql`
        query {
            launches(limit: 5) {
            launch_date_utc
            launch_success
            rocket {
                rocket_name
            }
            links {
                video_link
            }
            details
            }
        }
    `;

    const { loading, error, data } = useQuery(FIVE_LAUNCHES);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :</p>;

    return data.launches.map(({ launch_date_utc, launch_success, rocket, links, details }, index) => (
        <div key={index}>
            <p>
                {launch_date_utc}: {rocket.rocket_name}
            </p>
            <p>
                C'était un: {launch_success ? "gros succès" : "gros bide"}
            </p>
            <a href={links.video_link}>lien</a>
            <p>
                {details}
            </p>
        </div>
    ));
}

export default GetFiveLaunches;
