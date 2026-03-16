import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Webseries {
    title: string;
    tagline: string;
    episodes: Array<Episode>;
}
export interface Episode {
    title: string;
    description: string;
}
export interface backendInterface {
    getEpisodes(): Promise<Array<Episode>>;
    getWebseries(): Promise<Webseries>;
}
