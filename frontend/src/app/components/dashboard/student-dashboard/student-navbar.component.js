import { data } from "../../../app.store";
import { lastNameFromFullName } from "../../../helpers/util.helper";
import { hideDropdown, showDropdown } from "../../../helpers/animation.helper";
import { removeTokenFromLocal, removeTokenFromSession } from "../../../helpers/token.helper";

export class StudentNavbarComponent extends HTMLElement {

    #dropdownBtn;
    #dropdown;
    #signOutBtn;
    #dropdownItems;
    #dropdownState = {
        state: false
    }

    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = this.#render();
        this.#signOutBtn = this.querySelector("#sign_out_btn");
        this.#dropdownBtn = this.querySelector(".dropdown-btn");
        this.#dropdown = this.querySelector(".dropdown");
        this.#dropdownItems = Array.from(this.#dropdown.querySelectorAll("a"));

        this.#dropdownBtn.addEventListener("click", () => {
            if (this.#dropdownState.state) hideDropdown(this.#dropdown, this.#dropdownItems, this.#dropdownState);
            else showDropdown(this.#dropdown, this.#dropdownItems, this.#dropdownState);
        });

        this.#signOutBtn.addEventListener("click", () => {
            removeTokenFromSession();
            removeTokenFromLocal();
            location.reload();
        });

    }

    disconnectedCallback() {

    }

    #render() {
        return `
    <div class="lg:pl-20">
        <div
            class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 bg-transparent px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button type="button" class="-m-2.5 p-2.5 text-gray-700 lg:hidden">
                <span class="sr-only">Open sidebar</span>
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                    aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </button>

            <!-- Separator -->
            <div class="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true"></div>

            <div class="flex justify-end flex-1 gap-x-4 self-stretch lg:gap-x-6">
                
                <div class="flex items-center gap-x-4 lg:gap-x-6">

                    <button type="button" class="inline-flex items-center -m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                        <span class="sr-only">View messages</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-violet-400">
                            <path fill-rule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clip-rule="evenodd" />
                        </svg>
                    </button>

                    <button type="button" class="inline-flex items-center -m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                        <span class="sr-only">View messages</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-sky-400">
                            <path fill-rule="evenodd" d="M12 2.25c-2.429 0-4.817.178-7.152.521C2.87 3.061 1.5 4.795 1.5 6.741v6.018c0 1.946 1.37 3.68 3.348 3.97.877.129 1.761.234 2.652.316V21a.75.75 0 001.28.53l4.184-4.183a.39.39 0 01.266-.112c2.006-.05 3.982-.22 5.922-.506 1.978-.29 3.348-2.023 3.348-3.97V6.741c0-1.947-1.37-3.68-3.348-3.97A49.145 49.145 0 0012 2.25zM8.25 8.625a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zm2.625 1.125a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z" clip-rule="evenodd" />
                        </svg>
                        <div class="relative flex">
                            <div class="relative inline-flex w-3 h-3 bg-red-500 border-2 border-white rounded-full -top-2 right-2 dark:border-gray-900"></div>
                        </div>
                    </button>

                    <button type="button" class="inline-flex items-center -m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                        <span class="sr-only">View notifications</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-amber-400">
                            <path fill-rule="evenodd" d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z" clip-rule="evenodd" />
                        </svg>
                        <div class="relative flex">
                            <div class="relative inline-flex w-3 h-3 bg-red-500 border-2 border-white rounded-full -top-2 right-3 dark:border-gray-900"></div>
                        </div>
                    </button>

                    <!-- Separator -->
                    <div class="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10" aria-hidden="true"></div>

                    <!-- Profile dropdown -->
                    <div class="relative">
                        <button type="button" class="dropdown-btn -m-1.5 flex items-center p-1.5" id="user-menu-button"
                            aria-expanded="false" aria-haspopup="true">
                            <span class="sr-only">Open user menu</span>
                            <img class="h-8 w-8 rounded-full bg-gray-50"
                                src="${data.currentUser.profileImage}"
                                alt="${data.currentUser.fullName}">
                            <span class="hidden lg:flex lg:items-center">
                                <span class="ml-4 text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">👋 Hello,
                                    ${lastNameFromFullName(data.currentUser.fullName)}</span>
                                <svg class="ml-2 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"
                                    aria-hidden="true">
                                    <path fill-rule="evenodd"
                                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                        clip-rule="evenodd" />
                                </svg>
                            </span>
                        </button>

                        <!--
                Dropdown menu, show/hide based on menu state.
  
                Entering: "transition ease-out duration-100"
                  From: "transform opacity-0 scale-95"
                  To: "transform opacity-100 scale-100"
                Leaving: "transition ease-in duration-75"
                  From: "transform opacity-100 scale-100"
                  To: "transform opacity-0 scale-95"
              -->
                        <div class="dropdown opacity-0 absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
                            role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                            <!-- Active: "bg-gray-50", Not Active: "" -->
                            <a href="#" class="block px-3 py-1 text-sm leading-6 text-gray-900" role="menuitem"
                                tabindex="-1" id="user-menu-item-0">Your profile</a>
                            <a href="#" id="sign_out_btn" class="block px-3 py-1 text-sm leading-6 text-gray-900" role="menuitem"
                                tabindex="-1" id="user-menu-item-1">Sign out</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        
    </div>
        `;
    }
}

customElements.define("student-navbar", StudentNavbarComponent);