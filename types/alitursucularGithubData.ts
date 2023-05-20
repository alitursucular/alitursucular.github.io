export interface IAlitursucularGithubDataResponse {
    name: string;
    description: string;
    topics: string[];
    visibility: string;
    html_url: string;
    readme: {
        status: boolean;
        url: string;
        headers: Object;
        data: string;
    };
}
