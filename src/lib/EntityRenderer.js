'use strict';

export default class EntityRenderer {
    render(ctx, entity, props) {
        ctx.beginPath();
        ctx.arc(entity.x, entity.y, entity.r, 0, Math.PI * 2, false);
        ctx.fill();
    }
}



