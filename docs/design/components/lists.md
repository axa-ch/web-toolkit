---
title: List
template: design.jade
order: 2
draft: true
---

Do use lists to [list](#) one or multiple rows of similar structured data or information. Every list-element is click/tapable as an navigational item which leads to a new page which provieds deeper information on the list element. Lists can provide additional actions (for example remove, edit, add subitem, renew contract, etc.) . Lists usually contain multiple [list-elements](#listElements) of similar structure.

**Do not** use for bigger amounts of information (see [tables](#tables)) or making a statement (see [bullet-points](#bulletPoints))

<div class="example" >
  <div class="list">
    <div class="list__item">
      <div class="list__item__cell cell cell--title"><i class="cell__icon icon icon--cross"><span class="cell__icon__badge badge">2</span></i>
        <div class="cell__text"><strong>Autoversicherung</strong><br/><span>BMW</span></div>
      </div>
      <div class="list__item__cell cell"><span class="cell__label">Kontrollschild</span><br/><span class="cell__value">ZH 380 299</span></div>
      <div class="list__item__cell cell"><span class="cell__label">Prämie</span><br/><span class="cell__value">CHF 645.10</span></div>
      <div class="list__item__cell cell"><i class="cell__icon icon icon--cross"></i>
        <div class="cell__text"><span>01.01.2012</span><br/><span>31.12.2015</span></div>
      </div>
      <div class="list__item__cell cell cell--action"><a class="cell__action"><span>Schaden melden</span></a></div>
    </div>
    <div class="list__item">
      <div class="list__item__cell cell cell--title"><i class="cell__icon icon icon--home"></i>
        <div class="cell__text"><strong>Hausratversicherung</strong><br/><span>BOX OPTIMA</span></div>
      </div>
      <div class="list__item__cell cell"><span class="cell__label">Adresse</span><br/><span class="cell__value">Mutschellenstr. 67</span></div>
      <div class="list__item__cell cell"><span class="cell__label">Prämie</span><br/><span class="cell__value">CHF 869.21</span></div>
      <div class="list__item__cell cell"><i class="cell__icon icon icon--cross"></i>
        <div class="cell__text"><span>01.01.2012</span><br/><span>31.12.2015</span></div>
      </div>
      <div class="list__item__cell cell cell--action"><a class="cell__action"><span>Schaden melden</span></a></div>
    </div>
  </div>
</div>


# Simple list
*V1.0, beta*

Use simple lists unless you really need a more interactive version to keep the site calm and uncluttered.

Elements are arranged according to the grid and always full width. Mobile devices show the information in boxes, information are splittet into rows unless needed on the same row.

## Examples

>here we are now, examplain us

---
# Basic Sortable List
*V1.0, beta*

In contrast to the simple list, the sortable list has a heading on top of all rows instead one for each cell. The headers are clickable and allow sorting of all list elements. On mobile the headers disappear and a dropdown is display to have the sorting functionality. Sortable colums need to have an identical information included (such as price).

## Examples

Finally, we show the elment. If this element type is available in different states, sizes, variations and positions give different examples. If possible, an graphical-meassurement overlay should be shown on request.

---
# Professional Filter & Sortable List
*V0.5, depreceated*

Professional Lists should only be used in [power-user](#poweruser) environments, which excludes customer interfaces from the scope of this element.

Here we will have a detailed explanation of how this element realyl works.

## Examples

Finally, we show the elment. If this element type is available in different states, sizes, variations and positions give different examples. If possible, an graphical-meassurement overlay should be shown on request.

<!-- Copyright AXA Versicherungen AG 2015 -->
