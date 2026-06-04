// Creates a Page "Skill test" and a simple pricing card using Auto Layout
// Designed for `use_figma` execution: top-level await and `return` output

const pageName = "Skill test";

// Find or create page
let page = figma.root.children.find((p) => p.name === pageName);
if (!page) {
  page = figma.createPage();
  page.name = pageName;
  figma.root.appendChild(page);
}
await figma.setCurrentPageAsync(page);

// Position new content to the right of existing content to avoid overlap
let x = 100;
if (page.children.length) {
  const rightMost = Math.max(...page.children.map((c) => c.x + (c.width || 0)));
  if (isFinite(rightMost)) x = rightMost + 200;
}

// Create card frame (auto-layout vertical)
const card = figma.createFrame();
card.name = "Pricing Card";
card.layoutMode = "VERTICAL";
card.primaryAxisSizingMode = "AUTO";
card.counterAxisSizingMode = "AUTO";
card.paddingTop = 24;
card.paddingBottom = 24;
card.paddingLeft = 24;
card.paddingRight = 24;
card.itemSpacing = 12;
card.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
card.cornerRadius = 8;
card.x = x;
card.y = 100;

// Title
try { await figma.loadFontAsync({ family: "Roboto", style: "Bold" }); } catch(e) {}
const title = figma.createText();
title.characters = "Pro Plan";
title.fontName = { family: "Roboto", style: "Bold" };
title.fontSize = 24;
title.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }];
card.appendChild(title);

// Features list (vertical auto-layout)
const features = figma.createFrame();
features.name = "Features";
features.layoutMode = "VERTICAL";
features.primaryAxisSizingMode = "AUTO";
features.counterAxisSizingMode = "AUTO";
features.itemSpacing = 8;
features.fills = [];
card.appendChild(features);

// Feature rows
try { await figma.loadFontAsync({ family: "Roboto", style: "Regular" }); } catch(e) {}
const featureTexts = ["Unlimited projects", "Priority support", "Custom domains"];
const createdFeatureIds = [];
for (const ft of featureTexts) {
  const row = figma.createFrame();
  row.layoutMode = "HORIZONTAL";
  row.primaryAxisSizingMode = "AUTO";
  row.counterAxisSizingMode = "AUTO";
  row.itemSpacing = 8;
  row.fills = [];

  const bullet = figma.createEllipse();
  bullet.resize(8, 8);
  bullet.fills = [{ type: 'SOLID', color: { r: 0, g: 0.6, b: 0 } }];
  row.appendChild(bullet);

  const text = figma.createText();
  text.characters = ft;
  text.fontName = { family: "Roboto", style: "Regular" };
  text.fontSize = 14;
  text.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }];
  row.appendChild(text);

  features.appendChild(row);
  createdFeatureIds.push(row.id, bullet.id, text.id);
}

// Primary button
const button = figma.createFrame();
button.name = "Primary Button";
button.layoutMode = "HORIZONTAL";
button.primaryAxisSizingMode = "AUTO";
button.counterAxisSizingMode = "AUTO";
button.paddingTop = 10;
button.paddingBottom = 10;
button.paddingLeft = 16;
button.paddingRight = 16;
button.fills = [{ type: 'SOLID', color: { r: 0.06, g: 0.48, b: 1 } }];
button.cornerRadius = 6;

try { await figma.loadFontAsync({ family: "Roboto", style: "Medium" }); } catch(e) {}
const btnText = figma.createText();
btnText.characters = "Get started";
btnText.fontName = { family: "Roboto", style: "Medium" };
btnText.fontSize = 14;
btnText.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
button.appendChild(btnText);
card.appendChild(button);

// Append card to page
page.appendChild(card);

// Return created IDs for follow-up calls
return {
  createdNodeIds: [card.id, title.id, features.id, ...createdFeatureIds, button.id, btnText.id]
};
