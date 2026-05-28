//@ts-check
import Server from "../ts/Server.js";
import ChannelView from "./ChannelView.js";
import View from "./View.js";
import Viewer from "./Viewer.js";

export default class ServerView extends View {
    #server;
    /**@type {HTMLDivElement | undefined} */
    #element;
    
    /**@type {ChannelView | undefined} */
    #rootChannelView;
    
    /**
     * 
     * @param {Viewer} viewer The Viewer
     * @param {Server} server The Server
     */
    constructor(viewer, server) {
        super(viewer);
        
        this.#server = server;
    }
    
    getServer() {
        return this.#server;
    }
    
    getElement() {
        return this.#element;
    }
    
    buildTree() {
        this.#rootChannelView = new ChannelView(this.getViewer(), null, this.#server.getRootChannel());
        this.#rootChannelView.buildTree();
    }
    
    createElement() {
		if(!this.#rootChannelView) return;
		
        this.#element = document.createElement("div");
        this.#element.classList.add("server", "container");
        
        const rootChannelElement = this.#rootChannelView.createElement();
        this.#element.appendChild(rootChannelElement);
        
        return this.#element;
    }
    
    onTreeDisplayed() {
        this.#rootChannelView?.onTreeDisplayed();
    }
    
    propagateViewerUpdate() {
        this.#rootChannelView?.propagateViewerUpdate();
        this.onViewerUpdate();
    }
}