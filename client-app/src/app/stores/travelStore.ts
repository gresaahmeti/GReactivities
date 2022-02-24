/* eslint-disable */
import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
//import { Activity } from "../models/activity";
import {format} from 'date-fns';
import { Travel } from "../models/travel";

export default class TravelStore {
    travelRegistry = new Map<string, Travel>();
    selectedTravel: Travel | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

    get traveliesByDate() {
        return Array.from(this.travelRegistry.values()).sort((a, b) =>
            a.date!.getTime() - b.date!.getTime());
    }

    get groupTravelies() {
        return Object.entries(
            this.traveliesByDate.reduce((travelies, travel) => {
                const date = format(travel.date!, 'dd MMM yyyy');
                travelies[date] = travelies[date] ? [...travelies[date], travel] : [travel];
                return travelies;
            }, {} as {[key: string] : Travel[]})
        )
    }

    loadTravelies = async () => {
        this.loadingInitial=(true);
        try {
            const travelies = await agent.Travelies.list();
            travelies.forEach(travel => {
                this.setTravel (travel);
            })
            this.setLoadingInitial(false);

        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadTravel= async (id: string) => {
        let travel = this.getTravel(id);
        if (travel) {
            this.selectedTravel = travel;
            return travel;
        } else {
            this.loadingInitial = true;
            try{
                travel = await agent.Travelies.details(id);
                this.setTravel(travel);
                runInAction (() => {
                this.selectedTravel= travel;
                })
                this.setLoadingInitial (false);
                return travel;
            } catch (error) {
                console.log (error);
                this.setLoadingInitial (false);
            }
        }
    }

    private setTravel = (travel : Travel) => {
        travel.date = new Date(travel.date!);
        this.travelRegistry.set(travel.id, travel);
    }

    private getTravel = (id: string) => {
        return this.travelRegistry.get(id);
    }


    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    
    createTravel = async (travel: Travel) => {
        this.loading = true;
        try {
            await agent.Travelies.create(travel);
            runInAction(() => {
                this.travelRegistry.set(travel.id, travel);
                this.selectedTravel = travel;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateTravel = async (travel: Travel) => {
        this.loading = true;
        try {
            await agent.Travelies.update(travel);
            runInAction(() => {
                this.travelRegistry.set(travel.id, travel);
                this.selectedTravel =travel;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deleteTravel = async (id: string) => {
        this.loading = true;
        try {
            await agent.Travelies.delete(id);
            runInAction(() => {
                this.travelRegistry.delete(id);
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}