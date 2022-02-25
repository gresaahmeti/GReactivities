/* eslint-disable */
import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Photo } from "../models/photo";
import {format} from 'date-fns';

export default class PhotoStore {
    photoRegistry = new Map<string,Photo>();
    selectedPhoto: Photo | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

    get photoiesByDate() {
        return Array.from(this.photoRegistry.values()).sort((a, b) =>
            a.date!.getTime() - b.date!.getTime());
    }

    get groupPhotoies () {
        return Object.entries(
            this.photoiesByDate.reduce((photoies, photo) => {
                const date = format(photo.date!, 'dd MMM yyyy');
                photoies[date] = photoies[date] ? [...photoies[date], photo] : [photo];
                return photoies;
            }, {} as {[key: string] : Photo[]})
        )
    }

    loadPhotoies = async () => {
        this.loadingInitial=(true);
        try {
            const photoies = await agent.Photoies.list();
            photoies.forEach(photo => {
                this.setPhoto (photo);
            })
            this.setLoadingInitial(false);

        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadPhoto= async (id: string) => {
        let photo = this.getPhoto(id);
        if (photo) {
            this.selectedPhoto = photo;
            return photo;
        } else {
            this.loadingInitial = true;
            try{
                photo = await agent.Photoies.details(id);
                this.setPhoto(photo);
                runInAction (() => {
                this.selectedPhoto = photo;
                })
                this.setLoadingInitial (false);
                return photo;
            } catch (error) {
                console.log (error);
                this.setLoadingInitial (false);
            }
        }
    }

    private setPhoto = (photo : Photo) => {
        photo.date = new Date(photo.date!);
        this.photoRegistry.set(photo.id, photo);
    }

    private getPhoto = (id: string) => {
        return this.photoRegistry.get(id);
    }


    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    
    createPhoto = async (photo: Photo) => {
        this.loading = true;
        try {
            await agent.Photoies.create(photo);
            runInAction(() => {
                this.photoRegistry.set(photo.id, photo);
                this.selectedPhoto = photo;
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

    updatePhoto = async (photo: Photo) => {
        this.loading = true;
        try {
            await agent.Photoies.update(photo);
            runInAction(() => {
                this.photoRegistry.set(photo.id, photo);
                this.selectedPhoto = photo;
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

    deletePhoto = async (id: string) => {
        this.loading = true;
        try {
            await agent.Photoies.delete(id);
            runInAction(() => {
                this.photoRegistry.delete(id);
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