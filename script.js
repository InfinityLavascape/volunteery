document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("organizationSearch");
    const tableBody = document.getElementById("orgTableBody");

    const renderOrganizations = (items) => {
        if (!tableBody) return;

        tableBody.innerHTML = items.map((org) => `
            <tr class="org-row">
                <td>
                    <div class="org-main-cell">
                        <button class="toggle-row" type="button" aria-expanded="false" aria-label="Toggle details for ${org.name}">
                            <span class="chevron">›</span>
                        </button>
                        <span class="org-name-link">${org.name}</span>
                    </div>
                </td>
                <td><a href="${org.site}" target="_blank" rel="noreferrer">${org.siteLabel}</a></td>
            </tr>
            <tr class="org-details-row" hidden>
                <td colspan="2">
                    <div class="org-details">
                        <p><strong>Founder:</strong> ${org.founder}</p>
                        <p><strong>Year of establishment:</strong> ${org.year}</p>
                        <p><strong>Purpose:</strong> ${org.purpose}</p>
                        <p><strong>How to join:</strong> ${org.join}</p>
                    </div>
                </td>
            </tr>
        `).join("");

        tableBody.querySelectorAll(".toggle-row").forEach((button) => {
            button.addEventListener("click", () => {
                const row = button.closest(".org-row");
                const detailsRow = row.nextElementSibling;
                const isExpanded = button.getAttribute("aria-expanded") === "true";

                button.setAttribute("aria-expanded", String(!isExpanded));
                button.classList.toggle("expanded", !isExpanded);
                detailsRow.hidden = isExpanded;
            });
        });
    };

    const organizations = Array.isArray(window.organizations) ? window.organizations : [];
    renderOrganizations(organizations);

    if (!searchInput) {
        return;
    }

    searchInput.addEventListener("input", (event) => {
        const query = event.target.value.trim().toLowerCase();

        const filtered = organizations.filter((org) => {
            const haystack = `${org.name} ${org.founder} ${org.purpose} ${org.join} ${org.siteLabel}`.toLowerCase();
            return !query || haystack.includes(query);
        });

        renderOrganizations(filtered);
    });
});
